import axios from 'axios';
let m = new Map()

export const reqItemUnit = async  (name) => {
    if(!m.has(name)){
        const res = await axios.post('/item/detail',{Name: name});
        m.set(name, res.Unit);
        return res.Unit;

        
    }
    return m.get(name);
}