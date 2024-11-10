import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colorlibrary from './colorlibrary';
import Vote from './Vote';
import OverViewItem from './overView';
import Ingredient from './marketItem';

export default function RecipeCard({
  imageSrc,
  title,
  category,
  rating,
  views,
  description,
  infoItems,
  ingredients,
  steps,
}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={imageSrc} style={styles.image} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.category}>{category}</Text>
          </View>

          <Vote rateNumber={rating} viewNumber={views} />

          <Text style={styles.description}>{description}</Text>

          <View style={styles.info}>
            {infoItems.map((item, index) => (
              <OverViewItem key={index} iconPath={item.iconPath} info={item.info} />
            ))}
          </View>

          <View style={styles.buttons}>
            <CustomButton style={styles.buttonYellow} text="Đánh giá" />
            <CustomButton style={styles.buttonGreen} text="Thêm vào kho công thức" />
          </View>
        </View>
      </View>

      <Section title="Nguyên liệu" icon={require('../assets/caret-down.png')}>
        {ingredients.map((ingredient, index) => (
          <Ingredient
            key={index}
            ingredientName={ingredient.name}
            ingredientWeight={ingredient.weight}
          />
        ))}
      </Section>

      <Section title="Cách làm" icon={require('../assets/caret-down.png')}>
        <View style={styles.stepList}>
          {steps.map((step, index) => (
            <Step key={index} name={step.name} description={step.description} />
          ))}
        </View>
      </Section>
    </ScrollView>
  );
}

function CustomButton({ style, text }) {
  return (
    <TouchableOpacity style={style}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

function Section({ title, icon, children }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionText}>{title}</Text>
        <Image style={styles.sectionIcon} source={icon} />
      </View>
      {children}
    </View>
  );
}

function Step({ name, description }) {
  return (
    <View style={styles.step}>
      <View style={styles.stepName}>
        <Image style={styles.stepIcon} source={require('../assets/layers.png')} />
        <Text style={styles.stepTitle}>{name}</Text>
      </View>
      <Text style={styles.stepDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 16,
    backgroundColor: colorlibrary['--color-bg'],
  },
  card: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: 232,
  },
  image: {
    width: "100%",
    height: 271,
    borderRadius: 24,
  },
  content: {
    width: '87%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: colorlibrary['--white-100'],
    shadowColor: colorlibrary['--color-shawdow'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: colorlibrary['--black-60'],
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: colorlibrary['--black-100'],
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonYellow: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: colorlibrary['--color-warning'],
    borderRadius: 2,
  },
  buttonGreen: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: colorlibrary['--color-success'],
    borderRadius: 2,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
    color: colorlibrary['--white-100'],
  },
  section: {
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: colorlibrary['--black-100'],
  },
  sectionIcon: {
    width: 16,
    height: 16,
  },
  step: {
    gap: 6,
  },
  stepList: {
    gap: 10,
  },
  stepName: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  stepTitle: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepDescription: {
    paddingLeft: 8,
    fontFamily: 'Roboto',
    fontSize: 12,
    color: colorlibrary['--black-100'],
  },
  stepIcon: {
    width: 16,
    height: 16,
  },
});
