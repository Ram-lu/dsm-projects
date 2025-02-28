import java.util.Scanner;

public class App {
    public static void main(String[] args) throws Exception {
        char [] tablero = new char[9];
        for (int i = 0; i< tablero.length; i++){
            tablero[i] = ' ';
        }

        char jugador1 = 'X';
        char jugador2 = 'O';
        char turnoActual = jugador1;

        Scanner scanner = new Scanner(System.in);
        boolean hayGanador = false;
        boolean hayEmpate = false;

        while (!hayGanador && !hayEmpate){
            mostrarTablero(tablero);

            System.out.println("Turno del jugador " + turnoActual + ". Elige una casilla (1-9): ");
            int casilla = scanner.nextInt();

            if (casilla >= 1 && casilla <= 9 && tablero[casilla - 1] == ' '){
                tablero[casilla - 1] = turnoActual;

                hayGanador = verificarGanador(tablero, turnoActual);

                if (!hayGanador){
                    hayEmpate = verificarEmpate(tablero);
                }

                if(!hayGanador && !hayEmpate){
                    turnoActual = (turnoActual == jugador1) ? jugador2 : jugador1;
                }
            } else {
                System.out.println("Casilla ocupada o fuera de rango. Intenta nuevamente.");
            }
        }
        
        mostrarTablero(tablero);
        if(hayGanador){
            System.out.println("¡El jugador " + turnoActual + " ha ganado!");
        } else {
            System.out.println("¡Empate!");
        }

        scanner.close();
    }

    public static void mostrarTablero(char[] tablero){
        System.out.println(" " + tablero[0] + " | " + tablero[1] + " | " + tablero[2] + " ");
        System.out.println("---+---+---");
        System.out.println(" " + tablero[3] + " | " + tablero[4] + " | " + tablero[5] + " ");
        System.out.println("---+---+---");
        System.out.println(" " + tablero[6] + " | " + tablero[7] + " | " + tablero[8] + " ");
    }

    public static boolean verificarGanador(char[] tablero, char simbolo){
        if (tablero[0] == simbolo && tablero[1] == simbolo && tablero[2] == simbolo) return true;
        if (tablero[3] == simbolo && tablero[4] == simbolo && tablero[5] == simbolo) return true;
        if (tablero[6] == simbolo && tablero[7] == simbolo && tablero[8] == simbolo) return true;

        // Verificamos columnas
        if (tablero[0] == simbolo && tablero[3] == simbolo && tablero[6] == simbolo) return true;
        if (tablero[1] == simbolo && tablero[4] == simbolo && tablero[7] == simbolo) return true;
        if (tablero[2] == simbolo && tablero[5] == simbolo && tablero[8] == simbolo) return true;

        // Verificamos diagonales
        if (tablero[0] == simbolo && tablero[4] == simbolo && tablero[8] == simbolo) return true;
        if (tablero[2] == simbolo && tablero[4] == simbolo && tablero[6] == simbolo) return true;

        return false;
    }

    public static boolean verificarEmpate(char[] tablero){
        for(int i = 0; i < tablero.length; i++){
            if (tablero[i] == ' ') return false;
        }
        return true;
    }
}
