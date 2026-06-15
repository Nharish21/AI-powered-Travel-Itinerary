import java.util.Scanner;

public class travels {
    static String[][] buses = {
        {"Chennai", "Bangalore", "6", "799"},
        {"Chennai", "Madurai", "8", "599"},
        {"Chennai", "Coimbatore", "9", "899"},
        {"Bangalore", "Hyderabad", "10", "1099"},
        {"Mumbai", "Pune", "3", "499"}
    };

    static String[][] cars = {
        {"Sedan", "4", "1200"},
        {"SUV", "7", "2500"},
        {"Luxury", "4", "5000"}
    };

    static String[][] vans = {
        {"Tempo Traveller", "12", "3500"},
        {"Mini Bus", "20", "6000"},
        {"Luxury Van", "10", "4500"}
    };

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n===== Hari Travels =====");
            System.out.println("1. View Bus Services");
            System.out.println("2. View Car Rentals");
            System.out.println("3. View Van Services");
            System.out.println("4. Book a Service");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    viewBuses();
                    break;
                case 2:
                    viewCars();
                    break;
                case 3:
                    viewVans();
                    break;
                case 4:
                    bookService(sc);
                    break;
                case 5:
                    System.out.println("Thank you for visiting Hari Travels!");
                    break;
                default:
                    System.out.println("Invalid choice.");
            }
        } while (choice != 5);

        sc.close();
    }

    static void viewBuses() {
        System.out.println("\n--- Bus Services ---");
        for (String[] b : buses) {
            System.out.println(b[0] + " → " + b[1] + " | Duration: " + b[2] + "hrs | ₹" + b[3]);
        }
    }

    static void viewCars() {
        System.out.println("\n--- Car Rentals ---");
        for (String[] c : cars) {
            System.out.println(c[0] + " | Seats: " + c[1] + " | ₹" + c[2] + "/day");
        }
    }

    static void viewVans() {
        System.out.println("\n--- Van Services ---");
        for (String[] v : vans) {
            System.out.println(v[0] + " | Seats: " + v[1] + " | ₹" + v[2] + "/day");
        }
    }

    static void bookService(Scanner sc) {
        System.out.println("\nWhat would you like to book?");
        System.out.println("1. Bus  2. Car  3. Van");
        int type = sc.nextInt();
        sc.nextLine();

        System.out.print("Enter your name: ");
        String name = sc.nextLine();

        System.out.print("Enter number of passengers: ");
        int passengers = sc.nextInt();

        System.out.println("\n✅ Booking Confirmed!");
        System.out.println("Name: " + name);
        System.out.println("Passengers: " + passengers);
        System.out.println("Service: " + (type == 1 ? "Bus" : type == 2 ? "Car" : "Van"));
        System.out.println("Thank you for choosing Hari Travels!");
    }
}
