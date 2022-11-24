using GlobalData;
using Ubytec.Models;


namespace AdminData
{
}


namespace ClientData
{
    public class ProductOrder : Element
    {
        public string name { get; set; }
        public long price { get; set; }
        public int amount { get; set; }
        public string image { get; set; }

        public ProductoPedido toModel(Pedido pedido)
        {
            var producto = new ProductoPedido();
            producto.Cantidad = amount.ToString();
            producto.NombreProducto = name;
            producto.ComprobantePago = pedido.ComprobantePago;
            producto.CedulaJafiliado = pedido.CedulaJafiliado;
            return producto;
        }
    }

    public class Order : Element
    {
        public string ComprobantePago { get; set; } = null!;
        public string Dirreccion { get; set; } = null!;
        public string EstadoPedido { get; set; } = null!;
        public long Id { get; set; }
        public long Monto { get; set; }
        public string CedulaJafiliado { get; set; } = null!;
        public string CedulaCliente { get; set; } = null!;
        public IList<ProductOrder> Products { get; set; }

        public Order(string comprobantePago, string dirreccion, string cedulaJafiliado,
            IList<ProductOrder> products)
        {
            ComprobantePago = comprobantePago;
            Dirreccion = dirreccion;
            CedulaJafiliado = cedulaJafiliado;
            Products = products;
        }

        public Order(string ComprobantePago, string Dirreccion)
        {
            this.ComprobantePago = ComprobantePago;
            this.Dirreccion = Dirreccion;
        }

        public Order()
        {
        }

        public Pedido ToModel()
        {
            var order = new Pedido();
            order.Dirreccion = this.Dirreccion;
            order.CedulaJafiliado = this.CedulaJafiliado;
            order.EstadoPedido = "PENDIENTE";
            order.ComprobantePago = this.ComprobantePago;
            var orderProducts = Products.Select(product => product.toModel(order)).ToList();
            order.ProductoPedidos = orderProducts;
            order.Monto= this.Monto;
            return order;
        }
    }
}

namespace AfiliateData
{
}

namespace GlobalData
{
    public abstract class Element
    {
        internal static ubytecContext Context { get; set; } = null;
    }
}