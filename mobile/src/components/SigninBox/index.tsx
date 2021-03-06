import React from 'react'

import { View } from 'react-native'
import { COLORS } from '../../theme'
import { Button } from '../../components/Button'

import { useAuth } from '../../hooks/auth'

import { styles } from './styles'

export function SigninBox() {
    const { signIn, isSigningIn } = useAuth()

    return (
        <View style={styles.container}>
            <Button
                onPress={signIn}
                icon="github"
                backgroundColor={COLORS.YELLOW}
                color={COLORS.BLACK_PRIMARY}
                title="ENTRAR COM O GITHUB"
                isLoading={isSigningIn}
            />
        </View>
    )
}
