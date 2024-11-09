import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import colorlibrary from "./colorlibrary";

export default function Menu() {
    const [selected, setSelected] = useState('list'); 

    const onSelect = (type) => {
        setSelected(type);
        alert(type);
    };

    return (
        <View style={styles.MenuContainer}>
            <TouchableOpacity 
                style={[styles.list, selected === 'list' && styles.selected]}
                onPress={() => onSelect('list')}
            >
                <View>
                    <Image
                        source={require('../assets/list.png')}
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.gridOutline, selected === 'grid' && styles.selected]}
                onPress={() => onSelect('grid')}
            >
                <View>
                    <Image
                        source={require('../assets/grid-outline.png')}
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    MenuContainer: {
        width: 60,
        height: 20, 
        borderRadius: 10,
        shadowColor: colorlibrary["--color-shawdow"], 
        shadowOffset: { width: 5, height: 5 }, 
        elevation: 10,
        backgroundColor: 'transparent', 
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    list: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorlibrary["--color-bg"],
        width: '50%',
        height: '100%',
        borderTopLeftRadius: 10, 
        borderBottomLeftRadius: 10,
    },
    gridOutline: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorlibrary["--color-bg"], 
        width: '50%', 
        height: '100%', 
        borderTopRightRadius: 10, 
        borderBottomRightRadius: 10,
    },
    selected: {
        backgroundColor: colorlibrary["--white-100"], 
    },
    icon: {
        height: 10, 
        width: 10,
    }
});
