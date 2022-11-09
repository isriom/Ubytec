using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class Afiliado
    {
        public Afiliado()
        {
            Comentarios = new HashSet<Comentario>();
            Gerentes = new HashSet<Gerente>();
            Pedidos = new HashSet<Pedido>();
            Productos = new HashSet<Producto>();
            TelefonoAfiliados = new HashSet<TelefonoAfiliado>();
        }

        public string Nombre { get; set; } = null!;
        public string CedulaJuridica { get; set; } = null!;
        public string Distrito { get; set; } = null!;
        public string Provincia { get; set; } = null!;
        public string Canton { get; set; } = null!;
        public string Sinpe { get; set; } = null!;
        public string Correo { get; set; } = null!;
        public string Estado { get; set; } = null!;

        public virtual ICollection<Comentario> Comentarios { get; set; }
        public virtual ICollection<Gerente> Gerentes { get; set; }
        public virtual ICollection<Pedido> Pedidos { get; set; }
        public virtual ICollection<Producto> Productos { get; set; }
        public virtual ICollection<TelefonoAfiliado> TelefonoAfiliados { get; set; }
    }
}
