using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Ubytec.Models;

namespace Ubytec.Services
{
    public class ComentarioService
    {
        private readonly IMongoCollection<Comentario> _comentarioColletion;

        public ComentarioService(
            IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

            _comentarioColletion = mongoDatabase.GetCollection<Comentario>("Comentario");
        }

        public async Task<List<Comentario>> GetAsync() =>
            await _comentarioColletion.Find(_ => true).ToListAsync();

        public async Task<Comentario?> GetAsync(string id) =>
            await _comentarioColletion.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Comentario nuevoComentario) =>
            await _comentarioColletion.InsertOneAsync(nuevoComentario);

        public async Task UpdateAsync(string id, Comentario comentarioActualizado) =>
            await _comentarioColletion.ReplaceOneAsync(x => x.Id == id, comentarioActualizado);

        public async Task RemoveAsync(string id) => await _comentarioColletion.DeleteOneAsync(x => x.Id == id);
    }
}
