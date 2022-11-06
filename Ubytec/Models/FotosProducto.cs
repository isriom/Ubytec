using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class FotosProducto
    {
        public string CedulaJafiliado { get; set; } = null!;
        public string NombreProducto { get; set; } = null!;
        public string Urlfoto { get; set; } = null!;

        public virtual Producto Producto { get; set; } = null!;
    }
}
