# Hacker-Themed Interactive Portfolio

Created by Myles

## Overview

This project is an interactive, hacker-themed portfolio website that simulates a command-line interface. It showcases various skills and projects through unique, engaging features such as a virtual file system, ASCII art gallery, interactive CV, a text-based adventure game, and even a neural network visualizer.

## Features

1. **Command-Line Interface**: Navigate the portfolio using familiar terminal commands.
2. **Virtual File System**: Explore a simulated file structure containing information about projects and skills.
3. **ASCII Art Gallery**: View a collection of ASCII artwork.
4. **Interactive CV**: Access different sections of the CV using specific commands.
5. **Cyberpunk Quest**: Play a text-based adventure game set in a cyberpunk world.
6. **Neural Network Visualizer**: Create, train, and visualize simple neural networks in real-time.
7. **Hacking Minigames**: Engage with decryption and network scanning challenges.

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/fiston-user/ihatehumans
   cd ihatehumans
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

4. Open `http://localhost:3000` in your browser.

## Usage

Here are some of the main commands you can use in the portfolio:

- `help`: List all available commands
- `about`: Display information about Myles
- `skills`: Show a list of skills
- `projects`: View projects
- `cv [section]`: Access different parts of the CV (e.g., `cv summary`, `cv experience`)
- `ascii [art_name]`: Display ASCII art
- `cyberpunk`: Start the Cyberpunk Quest game
- `nn`: Access the Neural Network Visualizer

### Virtual File System Commands

- `cd [directory]`: Change directory
- `ls`: List contents of the current directory
- `cat [filename]`: Display contents of a file
- `pwd`: Print working directory

### Cyberpunk Quest Commands

- `cyberpunk help`: Show game-specific commands
- `cyberpunk look`: Examine your surroundings
- `cyberpunk go [direction]`: Move in a specified direction
- `cyberpunk take [item]`: Pick up an item
- `cyberpunk inventory`: Check your inventory

### Neural Network Visualizer Commands

- `nn create [inputNodes] [hiddenNodes] [outputNodes]`: Create a new neural network
- `nn train [inputs]|[targets]|[epochs]`: Train the neural network
- `nn run [inputs]`: Run the trained network with given inputs

## Customization

To customize the portfolio content:

1. Update the project information in `src/constants.js`
2. Modify the CV data in `src/components/InteractiveCV.js`
3. Add or change ASCII art in `src/components/AsciiArtGallery.js`
4. Expand the virtual file system in `src/components/VirtualFileSystem.js`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Myles - [contact@fiston.me] - [Myles]

Project Link: [https://github.com/fiston-user/ihatehumans](https://github.com/yourusername/hacker-portfolio)
