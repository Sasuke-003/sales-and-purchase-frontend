import { req } from './url/url'


let unitStore = new Map();


export const reqItemUnit = async  (name) => {

    if(!unitStore.has(name)){

        const itemDetailData = { Name : name }

        const res = await req.item.detail( itemDetailData );

        unitStore.set( name, res.Unit );

        return res.Unit;

    }

    return unitStore.get( name );

}

