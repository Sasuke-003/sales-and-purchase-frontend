import axios from 'axios';
let m = new Map()

export const reqItemUnit = (name) => {
    if(!m.has(name)){
        axios.post('/item/detail',{Name: name}).then((res) => {
            m.set(name, res.Unit);
        })
    }
    return m.get(name);
}