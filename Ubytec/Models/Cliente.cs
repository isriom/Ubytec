using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            Pedidos = new HashSet<Pedido>();
            TelefonoClientes = new HashSet<TelefonoCliente>();
        }

        public string Nombre { get; set; } = null!;
        public string Apellidos { get; set; } = null!;
        public string Cedula { get; set; } = null!;
        public string Distrito { get; set; } = null!;
        public string Provincia { get; set; } = null!;
        public string Canton { get; set; } = null!;
        public string Usuario { get; set; } = null!;
        public string? Contraseña { get; set; }
        public DateOnly? FechaNacimiento { get; set; }
        public string Correo { get; set; } = null!;

        public virtual ICollection<Pedido> Pedidos { get; set; }
        public virtual ICollection<TelefonoCliente> TelefonoClientes { get; set; }
    }
}
