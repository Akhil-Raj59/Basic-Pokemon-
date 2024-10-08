import React from 'react';
import { Link } from 'react-router-dom';

function Pokemon({name, image, id}) {
    return (
        <Link to={`/pokemon/${id}`}>
            <div  className='basis-[20%] mt-8 hover:bg-gray-400 h-[250px] w-[300px] flex flex-col justify-center items-center'>
                <div className='text-2xl tracking-wider'>{name}</div> 
                <div><img src={image} alt="img" className='h-40 max-h-full mt-4' /></div>
            </div>
        </Link>
    );
}

export default Pokemon;