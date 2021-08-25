import { createConnection } from 'typeorm';
import ormconfig from '../../ormconfig';

createConnection({ ...ormconfig }).then(() => {
    console.log('Conectado ao banco!');
});
