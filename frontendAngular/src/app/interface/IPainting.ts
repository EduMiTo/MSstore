export interface IPainting {
    id: string;
    width: number;
    lenght:number;
    price:number;
    image:Blob;
    file?: FormData;
    description: string;
    
}
