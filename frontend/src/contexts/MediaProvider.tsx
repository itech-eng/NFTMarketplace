import PropTypes from 'prop-types';
import {createContext, ReactNode, useContext, useState} from 'react';

type Props = {
    children: ReactNode;
};

type fileVariant = {
    type : string,
    url : string
}

type fileContentType = {
    name: string | null,
    type: string | null,
    url: string | null,
    variant: fileVariant | null
};

type collectionContextType = {
    getFileContent: ()=> fileContentType,
    setFileContent: (fileObject:fileContentType | null)=>void,
    getMediaImage: ()=> string,
    setMediaImage: (url : any)=>void,
};

const collectionContextDefaultValues: collectionContextType = {
    getFileContent: ()=>{return{
        name: null,
        type: null,
        url:  null,
        variant: null
    }},
    setFileContent: ()=>{},
    getMediaImage: ()=>{return ''},
    setMediaImage: ()=>{}
};



const MediaContext = createContext<collectionContextType>(collectionContextDefaultValues);

const MediaProvider = ({ children } : Props) => {
    const[imageUrl, setImageUrl] = useState<string>('');
    const[fileContent, setFileContentData] = useState<fileContentType | null>(null);

    const getMediaImage = ()=>{
        return imageUrl;
    }

    const setMediaImage = (url:string) => {
        setImageUrl(url)
    }

    const getFileContent = ()=>{
        return fileContent;
    }

    const setFileContent = (fileObject: fileContentType | null)=>{
        fileObject ? setFileContentData({
            name : fileObject.name ,
            type: fileObject.type,
            url: fileObject.url,
            variant: fileObject.variant
        }) : null;
    }

    return (
        // @ts-ignore
        <MediaContext.Provider value={{ getMediaImage,setMediaImage,setFileContent,getFileContent}}>
            {children}
        </MediaContext.Provider>
    );
};

MediaProvider.propTypes = {
    children: PropTypes.object,
};

const useMedia = () => useContext(MediaContext);

export { MediaProvider as default, useMedia };
