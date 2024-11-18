import { v2 as cloudinary } from 'cloudinary';
import mysql from 'mysql2';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'ddwpsulcv', 
        api_key: '165383184882889', 
        api_secret: 'sEdJZLw-7io9VIMmaRdeZ4-y1G4' // Click 'View API Keys' above to copy your API secret
    });
    

    
    console.log(autoCropUrl);    
});

(async function() {
    try {
        // Listar as imagens do Cloudinary (limitando a 100 imagens, por exemplo)
        const result = await cloudinary.api.resources({
            type: 'upload', // Para imagens
            max_results: 10 // Limite de resultados, você pode aumentar conforme necessário
        });

        // Imagens recuperadas do Cloudinary
        const images = result.resources;
        console.log('Imagens recuperadas:', images);

        // Conexão com o banco de dados MySQL
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123@abc',
            database: 'banco01'
        });

        db.connect(err => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err);
                return;
            }
            console.log('Conectado ao banco de dados MySQL.');
        });

        // Iterar sobre as imagens e armazenar as URLs no banco
        for (let image of images) {
            const imageUrl = image.url;
            console.log(imageUrl);
            const imageName = image.public_id; // Nome da imagem no Cloudinary

            // Salvar a URL da imagem no banco de dados
            const query = 'INSERT INTO game_images(name, url) VALUES (?, ?)';
            db.query(query, [imageName, imageUrl], (err, results) => {
                if (err) {
                    console.error('Erro ao salvar a imagem no banco:', err);
                } else {
                    console.log(`Imagem ${imageName} salva no banco.`);
                }
            });
        }

        // Fechar a conexão com o banco de dados
        db.end();
        console.log('Conexão com o banco de dados encerrada.');
        
    } catch (error) {
        console.error('Erro ao listar imagens do Cloudinary:', error);
    }
})();