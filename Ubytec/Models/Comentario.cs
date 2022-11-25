using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Ubytec.Models
{
    public partial class Comentario
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string ComprobantePago { get; set; } = null!;
        public string CedulaJafiliado { get; set; } = null!;
        public string Comentario1 { get; set; } = null!;

        public virtual Afiliado? CedulaJafiliadoNavigation { get; set; } = null!;
    }
}
