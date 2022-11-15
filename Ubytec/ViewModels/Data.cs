namespace Ubytec.ViewModels;

/**
 * Clase donde se maneja toda la estructura de los datos que se van a almacenar en la base de datos
 */
public class Data
{

    /**
     * Clase que manipula informacion del login
     */
    public class LoginUser
    {
        /**
         * Constructor
         * <param name="role"></param>
         */
        public LoginUser()
        {
            username = "";
            password = "";
            role = "";
        }

        public string role { get; set; }

        /**
         * Metodo  para obtener la info
         */
        public LoginUser(string password = null, string username = null, string role = null)
        {
            this.password = password;
            this.username = username;
            this.role = role;
        }

        /**
         * Metodo get y set para manejo del username
         */
        public string username { get; set; }

        /**
         * Metodo get y set para manejo del Constrasena
         */
        public string password { get; set; }
    }
}