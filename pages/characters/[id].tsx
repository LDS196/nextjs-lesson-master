import React from 'react';
import {API} from "../../assets/api/api";
import {CharacterType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {CharacterCard} from "../../components/Card/CharacterCard/CharacterCard";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import {GetStaticPaths, GetStaticProps} from "next";


export const getStaticPaths:GetStaticPaths = async ()=>{
    const {results} = await API.rickAndMorty.getCharacters()
    const paths = results.map(character=>(
        {params: {id: String(character.id)}}
    ))
    return{
        paths,
        fallback:false
    }
}
export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params || {}
    const character = await API.rickAndMorty.getCharacter(id as string)

    if (!character) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            character
        }
    }
}
type PropsType = {
    character: CharacterType
}
const Character = (props: PropsType) => {
    const {character} = props

    return (
        <PageWrapper>
            <CharacterCard character={character}/>
        </PageWrapper>
    );
};
Character.getLayout = getLayout
export default Character;