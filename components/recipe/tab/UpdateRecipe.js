import React, { useState, useEffect } from 'react';
import colorlibrary from '../../../assets/color/colorlibrary';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { updatedData, getToken, getMarketplaceitem } from '../../../api/apiRecipe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';


const MY_RECIPE_KEY = 'MyRecipeData';



export default  UpdateRecipe = ({ route , navigation }) => {
  const { item: item, categoriesData: categoriesData } = route.params; 
  const [newData, setNewData] = useState({
    category_id: '',
    name: '',
    image_url: '',
    description: '',
    time: '',
    serving: '',
    cost_estimate: '',
    kcal: '',
    ingredients: [],
    instructions: [],
  });
  const [marketplaceItem, setMarketplaceItem] = useState([])

  console.log('item', item)

  useEffect(() => {
    if (item) {
      setNewData({
        ...item,  
        // ingredients: item.ingredients ? JSON.parse(item.ingredients) : [],
        // instructions: item.instructions ? JSON.parse(item.instructions) : [],
        cost_estimate: parseInt(item.cost_estimate) ? parseInt(item.cost_estimate) : 0,
      });
    }
  }, [item]);


  useEffect(() => {
    const getmkplaceItem = async () => {
      try {
        const marketplaceitem = await getMarketplaceitem();
        setMarketplaceItem(marketplaceitem['items']); 
      } catch (error) {
        console.error("Error in:", error.message);
      }
    };
 
    getmkplaceItem();
  }, []);


  const handleAddInstruction = () => {
    setNewData((prev) => {
      const newInstruction = { step: prev.instructions.length + 1, name: '', detail: '' }; 
      return {
        ...prev,
        instructions: [...prev.instructions, newInstruction],
      };
    });
  };

  const handleMoveUp = (index) => {
    setNewData((prev) => {
      const instructions = [...prev.instructions];
      if (index > 0) {
        [instructions[index - 1], instructions[index]] = [instructions[index], instructions[index - 1]];
        
        // Cập nhật lại các giá trị step
        instructions.forEach((instruction, idx) => {
          instruction.step = idx + 1; // Cập nhật step lại theo vị trí
        });
  
        return { ...prev, instructions };
      }
      return prev;
    });
  };

  const handleMoveDown = (index) => {
    setNewData((prev) => {
      const instructions = [...prev.instructions];
      if (index < instructions.length - 1) {
        [instructions[index], instructions[index + 1]] = [instructions[index + 1], instructions[index]];
        
        // Cập nhật lại các giá trị step
        instructions.forEach((instruction, idx) => {
          instruction.step = idx + 1; // Cập nhật step lại theo vị trí
        });
  
        return { ...prev, instructions };
      }
      return prev;
    });
  };
  

  const validateData = () => {
    if (!newData.category_id) return 'Category ID is required';
    if (!newData.name) return 'Name is required';
    if (!newData.description) return 'Description is required';
    if (!newData.time || newData.time <= 0) return 'Time must be greater than 0';
    if (!newData.serving || newData.serving <= 0) return 'Serving must be greater than 0';
    if (!newData.cost_estimate || newData.cost_estimate <= 10000) return 'Cost estimate must be greater than 10,000';
    if (!newData.kcal || newData.kcal <= 0) return 'Kcal must be greater than 0';
    if (!newData.ingredients || newData.ingredients.length === 0) return 'At least one ingredient is required';
    for (let ingredient of newData.ingredients) {
      if (!ingredient.name || !ingredient.quantity) return 'Each ingredient must have a name and quantity';
    }
    if (!newData.instructions || newData.instructions.length === 0) return 'At least one instruction is required';
    for (let instruction of newData.instructions) {
      if (!instruction.step || !instruction.detail) return 'Each instruction must have a step and detail';
    }
    return null;
  };


  const handleUpdateRecipe = async () => {
    const validationError = validateData();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
  
    try {
      const jwt = await getToken();
      if (!jwt) {
        console.log('Failed to get JWT');
        return;
      }

      const result = await updatedData(jwt, item.id, newData);

      if (result.status === 200) {
       
        const storedData = await AsyncStorage.getItem(MY_RECIPE_KEY);
        console.log('storeData',storedData)

        let parsedData = storedData ? JSON.parse(storedData) : [];
        console.log('parsedData',parsedData)
        console.log('newData:', newData)

        const formattedData = {
          ...newData,
        };

        const updatedData = parsedData.map((recipe_item) =>
          recipe_item.id === item.id ? { ...recipe_item, ...formattedData } : recipe_item
        );

        await AsyncStorage.setItem(MY_RECIPE_KEY, JSON.stringify(updatedData));
        

        Alert.alert('Success', `Đã cập nhật công thức nấu ăn ${item.name}`);

        navigation.goBack();
        
      } else {
        console.log('Failed to update recipe. Response:', result);
      }
    } catch (error) {
      console.error('Error while updating recipe:', error);
      Alert.alert('Error', 'Failed to update recipe');
    }
  };
  

  const categoriesDropdownData = categoriesData.map(item => ({
    label: item.name,
    value: item.id,  
  }));


  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const results = marketplaceItem.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredData(results.slice(0, 6));
    } else {
      setFilteredData([]);
    }
  };

  const addIngredients = (item) => {
    
   
    if (!newData.ingredients.some((selected) => selected.marketplace_item_id === item.id)) {
      const newItem = {
        marketplace_item_id: item.id,
        name: item.name,
        quantity: '1',
      };
  
      setNewData((prev) => {
        const updatedIngredients = [...prev.ingredients, newItem];
        return { ...prev, ingredients: updatedIngredients };
      });
    }
    handleSearch('')
    console.log('ingredients:::::', newData.ingredients)

  };


  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Recipe Details */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.inputLarge}
          placeholder="Name"
          value={newData.name}
          onChangeText={(text) => setNewData({ ...newData, name: text })}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.dropdown}>
            <RNPickerSelect
                onValueChange={(value) => setNewData({ ...newData, category_id: value })}
                items={categoriesDropdownData}
                placeholder={{ label: "categories", value: item.category_id }}
                style={styles.inputAndroid}
            />
        </View>

   
        <Text style={styles.label}>Image path</Text>
        <TextInput
          style={styles.inputLarge}
          placeholder="image_url"
          multiline={true}
          value={newData.image_url}
          onChangeText={(text) => setNewData({ ...newData, image_url: text })}
        />
    

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.inputLarge}
        placeholder="Description"
        multiline={true}
        value={newData.description}
        onChangeText={(text) => setNewData({ ...newData, description: text })}
      />


      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.smallLabel}>Time</Text>
          <View View style={{width: '100%'}}>
          <TextInput
            style={styles.inputLarge}
            placeholder="time"
            value={newData.time ? newData.time.toString() : ''}
            onChangeText={(text) => {
              const parsedValue = parseInt(text, 10);
              setNewData({ ...newData, time: isNaN(parsedValue) ? 0 : parsedValue });
            }}
            keyboardType="numeric"
          />
          </View>
        </View>
        

        <View style={styles.col}>
          <Text style={styles.smallLabel}>Serving</Text>
          <View View style={{width: '100%'}}>
          <TextInput
            style={styles.inputLarge}
            placeholder="serving"
            value={newData.serving ? newData.serving.toString() : ''}
            onChangeText={(text) => {
              const parsedValue = parseInt(text, 10);
              setNewData({ ...newData, serving: isNaN(parsedValue) ? 0 : parsedValue });
            }}
            keyboardType="numeric"
          />
        </View>
        </View>
      <View style={styles.col}>
        <Text style={styles.smallLabel}>Cost</Text>
        < View style={{width: '100%'}}>
        <TextInput
            style={styles.inputLarge}
            placeholder="cost_estimate"
            value={newData.cost_estimate ? newData.cost_estimate.toString() : ''}
            onChangeText={(text) => {
              const parsedValue = parseInt(text, 10);
              setNewData({ ...newData, cost_estimate: isNaN(parsedValue) ? 0 : parsedValue });
            }}
            keyboardType="numeric" 
          />
         </View>
      </View>
            
      <View style={styles.col}>
        <Text style={styles.smallLabel}>Kcal</Text>
        < View style={{width: '100%'}}>
        <TextInput
          style={styles.inputLarge}
          placeholder="kcal"
          value={newData.kcal ? newData.kcal.toString() : ''}
          onChangeText={(text) => {
            const parsedValue = parseInt(text, 10);
            setNewData({ ...newData, kcal: isNaN(parsedValue) ? 0 : parsedValue });
          }}
          keyboardType="numeric" 
        />
        </View>

        
      </View>
        
     </View>
     

          {/* Ingredients Section */}
          <Text style={styles.label}>Ingredients:</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.inputLarge}
              placeholder="Search ingredients..."
              value={query}
              onChangeText={handleSearch}
            />


            <View style={styles.suggestionsContainer}>
                {filteredData.map((item) => (
                  <View key={item.id} style={styles.itemContainer}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <TouchableOpacity
                      style={styles.addButtonSmall}
                      onPress={() => addIngredients(item)}
                    >
                      <Text style={{color: colorlibrary['--color-blue-bg']}}>Add</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

          </View>


          {newData.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.inputLarge}>
              <Text style={{flex:1 }}>{ingredient.name}</Text>
            </View>

            <TextInput
              style={styles.inputLarge}
              placeholder="Quantity"
              value={ingredient.quantity}
              onChangeText={(text) =>
                setNewData((prev) => {
                  const ingredients = [...prev.ingredients];
                  ingredients[index].quantity = text;
                  return { ...prev, ingredients };
                })
              }
            />

            <TouchableOpacity
              onPress={() => {
                setNewData((prev) => {
                  const ingredients = [...prev.ingredients];
                  ingredients.splice(index, 1);
                  ingredients.forEach((ingredient, idx) => {
                    ingredient.step = idx + 1;
                  });
                  return { ...prev, ingredients };
                });
              }}
              style={[styles.controlButton, styles.removeButton]}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          ))}


      <Text style={styles.label}>Instructions:</Text>
      {newData.instructions.map((instruction, index) => (
        <View key={index} style={styles.instructionRow}>
          <View style={styles.col}>
            <View style={{ width: '100%' }}>
              <TextInput
                style={styles.instructionName}
                placeholder="Enter step name"
                value={instruction.name}
                multiline={true}
                onChangeText={(text) =>
                  setNewData((prev) => {
                    const instructions = [...prev.instructions];
                    instructions[index].name = text;
                    return { ...prev, instructions };
                  })
                }
              />
            </View>

            <TextInput
              style={styles.instructionInput}
              placeholder="Enter step description"
              value={instruction.detail}
              multiline={true}
              onChangeText={(text) =>
                setNewData((prev) => {
                  const instructions = [...prev.instructions];
                  instructions[index].detail = text;
                  return { ...prev, instructions };
                })
              }
            />
          </View>

          <View style={styles.controlColumn}>
            {/* Move Up Button */}
            {index > 0 && (
              <TouchableOpacity
                onPress={() => handleMoveUp(index)}
                style={styles.controlButton}
              >
                <Text style={styles.controlButtonText}>↑</Text>
              </TouchableOpacity>
            )}

            {/* Move Down Button */}
            {index < newData.instructions.length - 1 && (
              <TouchableOpacity
                onPress={() => handleMoveDown(index)}
                style={styles.controlButton}
              >
                <Text style={styles.controlButtonText}>↓</Text>
              </TouchableOpacity>
            )}

            {/* Remove Button */}
            <TouchableOpacity
              onPress={() => {
                setNewData((prev) => {
                  const instructions = [...prev.instructions];
                  instructions.splice(index, 1);
                  // Cập nhật lại các giá trị step sau khi xóa một bước
                  instructions.forEach((instruction, idx) => {
                    instruction.step = idx + 1;
                  });
                  return { ...prev, instructions };
                });
              }}
              style={[styles.controlButton, styles.removeButton]}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity onPress={handleAddInstruction} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Instruction</Text>
      </TouchableOpacity>

      {/* Buttons */}
      <TouchableOpacity style={styles.addButton} onPress={handleUpdateRecipe}>
        <Text style={styles.addButtonText}>Update Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colorlibrary['--color-bg']},
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },

  dropdown: {
    backgroundColor: colorlibrary['--white-100'],
    marginBottom: 10,
    borderRadius: 8,
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colorlibrary['--white-60'],
  },

  inputLarge: {
    backgroundColor: colorlibrary['--white-100'],
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colorlibrary['--white-60'],
  },

  col : { flexDirection: 'col', alignItems: 'center', flex: 1, alignItems: 'flex-start', gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 },


  label: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  smallLabel: {
    fontSize: 15,
    marginVertical: 8,
    fontWeight: 'bold',
  },

  instructionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    padding: 10,
    backgroundColor: colorlibrary['--white-100'],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colorlibrary['--white-80'],
  },
  instructionName: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: colorlibrary['--color-bg'],
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colorlibrary['--white-80'],
    textAlignVertical: 'top',
  },
  instructionInput: {
    flex: 1,
    width: '100%',
    padding: 10,
    fontSize: 16,
    backgroundColor: colorlibrary['--color-bg'],
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colorlibrary['--white-80'],
    minHeight: 60,
    textAlignVertical: 'top',
  },

  controlColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 10,
  },
  controlButton: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: colorlibrary['--white-60'],
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  controlButtonText: {
    fontSize: 16,
    color: colorlibrary['--black-100'],
  },
  removeButton: {
    backgroundColor: colorlibrary['--color-removeButton'],
  },
  removeButtonText: {
    color: colorlibrary['--color-removeText'],
    fontWeight: 'bold',
  },
  addButton: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: colorlibrary['--color-blue-bg'],
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonSmall: {
    marginVertical: 4,
    padding: 5,
    borderRadius: 6,
    alignItems: 'center',
    color: colorlibrary['--color-bg']
  },
  addButtonText: {
    color: colorlibrary['--white-100'],
    fontWeight: 'bold',
  },
  inputAndroid: {
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: colorlibrary['--white-60'],
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'red',
  },

  searchContainer: {
    position: 'relative', 
    zIndex: 10, 
  },

  suggestionsContainer: {
    // position: 'absolute',
    // top: 55, 
    left: 0,
    right: 0,
    backgroundColor: colorlibrary['--white-100'],
    borderColor: colorlibrary['--white-60'],
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
    borderRadius: 5,
    borderBottomColor: colorlibrary['--white-60'],
    borderBottomWidth: 1,
    backgroundColor: colorlibrary['--color-bg']
  },

});