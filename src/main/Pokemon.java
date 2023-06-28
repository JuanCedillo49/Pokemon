package main;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;
//import org.json.JSONObject

public class Pokemon extends JFrame {
    private JButton searchButton;
    private JTextField inputField;
    private JLabel resultLabel;

    public Pokemon() {
        super("Pokémon Search");
        
       

        searchButton = new JButton("Search");
        inputField = new JTextField(20);
        resultLabel = new JLabel();

        JPanel panel = new JPanel();
        panel.add(new JLabel("ID or Name:"));
        panel.add(inputField);
        panel.add(searchButton);
        panel.add(resultLabel);

        add(panel);

        searchButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String input = inputField.getText().trim();
                if (!input.isEmpty()) {
                    searchPokemon(input);
                } else {
                    JOptionPane.showMessageDialog(null, "Please enter a valid ID or name.");
                }
            }
        });
    }

    private void searchPokemon(String param) {
        try {
            String apiUrl = "https://pokeapi.co/api/v2/pokemon/" + param;
            URL url = new URL(apiUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();
            
            

            resultLabel.setText(response.toString());
        } catch (IOException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(null, "An error occurred while searching for the Pokémon.");
        }
    }

    public static void main(String[] args) {
        Pokemon searchInterface = new Pokemon();
        searchInterface.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        searchInterface.setSize(400, 200);
        searchInterface.setVisible(true);
    }
}
