import React from 'react';
import { LocationType, ResponseType} from "../../assets";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {dehydrate, useQuery} from "@tanstack/react-query";

import {QueryClient} from "@tanstack/query-core";
import {Card} from "../../components/Card/Card";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import Home from "../index";


const getLocations = () => {
    return fetch('https://rickandmortyapi.com/api/location', {
        method: 'GET'
    }).then(res => res.json())
}
export const getStaticProps = async ()=>{
    const queryClient = new QueryClient()
    await queryClient.fetchQuery(['locations'],getLocations)

    return{
        props:{
            dehydrateState: dehydrate(queryClient)
        }
    }
}
const Locations = () => {
    const {data: locations} = useQuery<ResponseType<LocationType>>(['locations'], getLocations)
    if (!locations) {
        return null
    }

    const locationsList = locations.results.map(location => {
        return <Card key={location.id} name={location.name}/>
    })
    return (
        <PageWrapper>
            {locationsList}
        </PageWrapper>
    );
};
Locations.getLayout = getLayout
export default Locations;