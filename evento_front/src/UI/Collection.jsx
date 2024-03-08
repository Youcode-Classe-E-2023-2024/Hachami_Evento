import React from 'react'
import Card from './Card'


const Collection = () => {
    return (
        <>
            <div className=" w-full align-middle justify-center  flex flex-wrap  flex-col gap-5 md:flex-row">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />

            </div>
        </>
    )
}

export default Collection