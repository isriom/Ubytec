using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class Afiliado
    {
        public Afiliado()
        {
            Gerentes = new HashSet<Gerente>();
            Pedidos = new HashSet<Pedido>();
            Productos = new HashSet<Producto>();
            TelefonoAfiliados = new HashSet<TelefonoAfiliado>();
        }

        public string? Nombre { get; set; }
        public string CedulaJuridica { get; set; } = null!;
        public string? Distrito { get; set; }
        public string? Provincia { get; set; }
        public string? Canton { get; set; }
        public string? Sinpe { get; set; }
        public string? Correo { get; set; }

        public virtual ICollection<Gerente> Gerentes { get; set; }
        public virtual ICollection<Pedido> Pedidos { get; set; }
        public virtual ICollection<Producto> Productos { get; set; }
        public virtual ICollection<TelefonoAfiliado> TelefonoAfiliados { get; set; }
    }
}
