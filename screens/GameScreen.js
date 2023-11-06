import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import Icon from 'react-native-vector-icons/FontAwesome5';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
    const rnNum = Math.floor(Math.random() * (max - min)) + min;

    if (rnNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rnNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber); //1, 100 not minBoundary, maxBoundary to avoit to recall
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuesshandler(direction) {
        //direction => lower , greater
        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert("Don't lie!", 'You know that this is wrong...', [{ text: 'Sorry', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            maxBoundary = currentGuess - 1;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
    }

    const guessRoundListLength = guessRounds.length;

    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText>Higher or lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuesshandler.bind(this, 'greater')}>
                        <Icon name="plus" size={20} color="white" />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuesshandler('lower')}>
                        <Icon name="minus" size={20} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>;

    if (width > 500) {
        content = <>
            <View style={styles.buttonsContainerWide}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuesshandler.bind(this, 'greater')}>
                        <Icon name="plus" size={20} color="white" />
                    </PrimaryButton>
                </View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuesshandler('lower')}>
                        <Icon name="minus" size={20} color="white" />
                    </PrimaryButton>
                </View>
            </View>

        </>;
    }

    const verticalListPadding = width > 500 ? 0 : 16;

    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title >
        {/* <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText>Higher or lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuesshandler.bind(this, 'greater')}><Icon name="plus" size={20} color="white" /></PrimaryButton>
                </View>
                <View style={styles.buttonContainer}><PrimaryButton onPress={() => nextGuesshandler('lower')}><Icon name="minus" size={20} color="white" />
                </PrimaryButton></View>
            </View>
        </Card> */}
        {content}
        <View style={[styles.listContainer, { paddingVertical: verticalListPadding }]}>
            {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
            {/*Use a Flatlist better */}
            <FlatList data={guessRounds} renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundListLength - itemData.index} guess={itemData.item} />} keyExtractor={(item) => item} />
        </View>
    </View>;
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1, //to see scroll
        padding: 16,
    },
});
