//library to use api
const axios = require('axios');
//library to export to file
const fs = require('fs');

async function showPeople() {
    //receive the command parameter
    let command = process.argv[2];
    //api url to use
    let res = await axios.get('https://swapi.dev/api/people');
    let data = res.data;
    const arrays = [];
    //save the results in object array
    arrays.push(data.results);

    //validation the input command
    if (command == 'setpeople') {
        arrays.push(data.results);
        console.log("Data Loaded");
        console.log(arrays[0]);
    } else if (command == 'getpeople') {
        console.log(arrays);
    } else if (command == 'getpeopleby') {
        //validate the input is not undefined
        if (typeof process.argv[3] !== 'undefined' && process.argv[3]) {
            const [, param] = process.argv[3].split(":");
            arrays[0].forEach(function (elem) {
                if (param == 'name') {
                    console.log(elem.name);
                } else if (param == 'height') {
                    console.log(elem.height);
                } else if (param == 'mass') {
                    console.log(elem.mass);
                } else {
                    console.log("select some parameter to show information");
                }
            })
        }
    } else if (command == 'postpeople') {
        let person = [];
        person.push(process.argv[3]);
        arrays.push(person);
        console.log(arrays);
    } else if (command == 'unsetpeoplebyid') {
        let index = process.argv[3];
        let InitialIndex = index++;
        let deleted = [];
        deleted.push(arrays[0][InitialIndex]);
        arrays[0].splice(InitialIndex, 1);

        const writeStream = fs.createWriteStream('tavo.txt');
        const pathName = writeStream.path;
        // write each value of the array on the file breaking line
        deleted.forEach(value => writeStream.write(`$\n`));
        // the finish event is emitted when all data has been flushed from the stream
        writeStream.on('finish', () => {
            console.log(`wrote all the array data to file $`);
        });
        // handle the errors on the write process
        writeStream.on('error', (err) => {
            console.error(`There is an error writing the file $ => $`)
        });
        // close the stream
        writeStream.end();

    }
}

showPeople();