

export function hashed(len : number) :string {
    let str : string = ""
    const randomised_string = "abcdefghijklmnopqrstsd"
    for(let i = 0;i<len ;i++){
     str += randomised_string[Math.floor(Math.random()*randomised_string.length)]
        }

    return str
}

hashed(10)