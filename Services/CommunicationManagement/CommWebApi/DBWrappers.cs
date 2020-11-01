using System;
using System.Data;
using System.Data.SqlClient;
using Npgsql;

namespace CommWebApi.DBWrappers {

    public class DBWrapper {

        private static string db_server = "localhost";
        private static string db_user = "postgres";
        private static string db_name = "postgres";
        private static string db_password = "Mouse1Pad4";
        private static string db_port = "3333";
        private static string table_name = "test_table";

        string ConnectionString = String.Format("Server={0};Username={1};Database={2};Port={3};Password={4};SSLMode=Prefer",
            db_server,
            db_user,
            db_name,
            db_port,
            db_password);

        private NpgsqlConnection open_db_connection(){
            var Connection = new NpgsqlConnection(ConnectionString);
            Connection.Open();
            return Connection;
        }

        private void close_db_connection(NpgsqlConnection open_connection){
            open_connection.Close();
        }

        public bool test_connection(){
            NpgsqlConnection Connection = open_db_connection();
            if (Connection != null){
                return true;
            }
            return false;
        }

        public bool check_for_duplicate(string email_addr){

            using NpgsqlConnection Connection = open_db_connection();
            using NpgsqlCommand cmd = new NpgsqlCommand();
            cmd.Connection = Connection;
            cmd.CommandText = "SELECT COUNT(1) FROM " + table_name + " WHERE email_addr = '" + email_addr + "';";
            Int64 data = (Int64)cmd.ExecuteScalar();

            if (data == 0){
                close_db_connection(Connection);
                return false;
            }
            else{
                close_db_connection(Connection);
                return true;
            }
        }

        public void add_to_DB(string first_name, string last_name, string email_addr){

            using NpgsqlConnection Connection = open_db_connection();
            using NpgsqlCommand cmd = new NpgsqlCommand();
            cmd.Connection = Connection;
            cmd.CommandText = "INSERT INTO " + table_name + " (first_name, last_name, email_addr) VALUES ('" + first_name + "', '" + last_name + "', '" + email_addr + "');";
            cmd.ExecuteNonQuery();
            close_db_connection(Connection);
        }
    }
}