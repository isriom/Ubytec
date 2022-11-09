using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class Comentario
    {
        public string CedulaJafiliado { get; set; } = null!;
        public string Comentario1 { get; set; } = null!;

        public virtual Afiliado CedulaJafiliadoNavigation { get; set; } = null!;
    }
}
