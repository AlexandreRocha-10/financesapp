import React, { useContext, useState } from 'react';

import { View, Text, Image } from 'react-native';

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { AuthContext } from '../../contexts/auth';


export default function CustomDrawer(props) {
    const { user, signOut } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                <Image 
                source={require('../../assets/Logo.png')}
                style={{width: 85, height: 85}}
                resizeMode='contain'
                />

                <Text style={{marginTop: 5, fontSize: 18, color: '#FFF'}}> 
                    Bem-Vindo
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#FFF'}}> 
                   { user && user.nome }
                </Text>
            </View>

            <DrawerItemList {...props} />

            <DrawerItem {...props} 
            label='Sair do App'
            inactiveTintColor='#c62c36'
            onPress={() => signOut()}
            />
        </DrawerContentScrollView>
    );
}