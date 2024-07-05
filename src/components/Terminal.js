import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Cpu, Zap, Ghost } from 'lucide-react';
import MatrixRain from '../components/MatrixRain';
import FirewallVisualizer from '../components/FirewallVisualizer';
import DecryptionMinigame from '../components/DecryptionMinigame';
import NmapMinigame from '../components/NmapMinigame';
import ProjectCard from '../components/ProjectCard';
import { ASCII_ART, LOADING_FRAMES, HINT_DELAY, projects } from '../constants';

const Terminal = () => {
  const [stage, setStage] = useState('boot');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFrame, setLoadingFrame] = useState(0);
  const [hackProgress, setHackProgress] = useState(0);
  const [hint, setHint] = useState('');
  const [activeMinigame, setActiveMinigame] = useState(null);
  const [firewall, setFirewall] = useState(Array(10).fill(true));
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tabCompletions, setTabCompletions] = useState([]);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (stage === 'boot') {
      bootSequence();
    }
    inputRef.current?.focus();
  }, [stage]);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingFrame((prev) => (prev + 1) % LOADING_FRAMES.length);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    const hintInterval = setInterval(() => {
      if (stage === 'hack') {
        setHint('Hint: Keep entering commands to increase hack progress!');
      } else if (stage === 'terminal') {
        setHint("Hint: Try commands like 'about', 'skills', 'projects', 'decrypt', or 'nmap'!");
      }
      setTimeout(() => setHint(''), 5000);
    }, HINT_DELAY);

    return () => clearInterval(hintInterval);
  }, [stage]);

  const bootSequence = async () => {
    setLoading(true);
    await typeWriter('Initializing system...');
    await new Promise((r) => setTimeout(r, 1000));
    await typeWriter('Loading kernel...');
    await new Promise((r) => setTimeout(r, 1000));
    await typeWriter('Establishing secure connection...');
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setOutput((prev) => [...prev, { type: 'ascii', content: ASCII_ART }]);
    await typeWriter('Access denied. Initiating bypass sequence...');
    setStage('hack');
  };

  const typeWriter = async (text, speed = 50) => {
    setOutput((prev) => [...prev, { type: 'system', content: text }]);
    await new Promise((r) => setTimeout(r, speed * text.length));
  };

  const updateFirewall = (progress) => {
    setFirewall((prev) => {
      const newFirewall = [...prev];
      const breakIndex = Math.floor((progress / 100) * newFirewall.length);
      if (breakIndex < newFirewall.length) newFirewall[breakIndex] = false;
      return newFirewall;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex((prev) => prev + 1);
        setInput(commandHistory[commandHistory.length - 1 - historyIndex - 1]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) {
        setHistoryIndex((prev) => prev - 1);
        setInput(
          historyIndex === 0 ? '' : commandHistory[commandHistory.length - 1 - historyIndex + 1]
        );
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    }
  };

  const handleTabCompletion = () => {
    const commands = [
      'help',
      'about',
      'skills',
      'projects',
      'contact',
      'clear',
      'hack',
      'matrix',
      'decrypt',
      'nmap',
      'firewall',
    ];
    const matchingCommands = commands.filter((cmd) => cmd.startsWith(input));

    if (matchingCommands.length === 1) {
      setInput(matchingCommands[0]);
    } else if (matchingCommands.length > 1) {
      setTabCompletions(matchingCommands);
    }
  };

  const handleCommand = async (cmd) => {
    setOutput((prev) => [...prev, { type: 'input', content: cmd }]);
    setTabCompletions([]);

    if (stage === 'hack') {
      const progress = Math.random() * 20;
      setHackProgress((prev) => Math.min(prev + progress, 100));
      updateFirewall(hackProgress + progress);
      if (hackProgress + progress >= 100) {
        await typeWriter('Access granted. Welcome to the system.');
        setStage('terminal');
        return;
      }
      await typeWriter(`Bypass progress: ${(hackProgress + progress).toFixed(2)}%`);
      return;
    }

    const [command, ...args] = cmd.split(' ');

    switch (command.toLowerCase()) {
      case 'help':
        await typeWriter(
          'Available commands: about, skills, projects, contact, clear, hack, matrix, decrypt, nmap, firewall'
        );
        break;
      case 'about':
        await typeWriter(
          "I'm a full-stack developer with a passion for pushing technological boundaries."
        );
        break;
      case 'skills':
        await typeWriter(
          'Skills: Ethical Hacking, Cryptography, Quantum Computing, AI/ML, Full-Stack Development'
        );
        break;
      case 'projects':
        if (args[0] === 'list') {
          setOutput((prev) => [...prev, { type: 'projects', content: projects }]);
        } else if (args[0] === 'info' && args[1]) {
          const project = projects.find(
            (p) => p.name.toLowerCase() === args.slice(1).join(' ').toLowerCase()
          );
          if (project) {
            setOutput((prev) => [...prev, { type: 'project', content: project }]);
          } else {
            await typeWriter('Project not found.');
          }
        } else {
          await typeWriter('Usage: projects list | projects info <project name>');
        }
        break;
      case 'contact':
        await typeWriter('Email: myles@contact.com | GitHub: @fiston-user | LinkedIn: in/myles');
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'hack':
        setStage('hack');
        setHackProgress(0);
        setFirewall(Array(10).fill(true));
        await typeWriter('Initiating advanced system bypass...');
        break;
      case 'matrix':
        setOutput((prev) => [...prev, { type: 'matrix', content: 'matrix' }]);
        break;
      case 'decrypt':
        setActiveMinigame('decrypt');
        await typeWriter('Initializing decryption module. Stand by...');
        break;
      case 'nmap':
        setActiveMinigame('nmap');
        await typeWriter('Starting network scan. Please wait...');
        break;
      case 'firewall':
        setOutput((prev) => [...prev, { type: 'firewall', content: firewall }]);
        break;
      default:
        await typeWriter(`Command not recognized: ${command}`);
    }
  };

  const renderOutput = (line, index) => {
    switch (line.type) {
      case 'ascii':
        return (
          <pre key={index} className="text-green-400">
            {line.content}
          </pre>
        );
      case 'matrix':
        return <MatrixRain key={index} />;
      case 'firewall':
        return <FirewallVisualizer key={index} firewall={line.content} />;
      case 'projects':
        return (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {line.content.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        );
      case 'project':
        return <ProjectCard key={index} project={line.content} expanded />;
      default:
        return (
          <pre
            key={index}
            className={`whitespace-pre-wrap ${
              line.type === 'error'
                ? 'text-red-500'
                : line.type === 'system'
                ? 'text-yellow-500'
                : line.type === 'input'
                ? 'text-blue-500'
                : ''
            }`}
          >
            {line.type === 'input' ? '> ' : ''}
            {line.content}
          </pre>
        );
    }
  };

  return (
    <>
      <div ref={outputRef} className="mb-4 overflow-y-auto h-[calc(100vh-100px)]">
        {output.map(renderOutput)}
        {loading && <div className="animate-pulse">{LOADING_FRAMES[loadingFrame]} Loading...</div>}
      </div>
      <div className="flex items-center">
        <TerminalIcon className="mr-2" />
        <span className="mr-2">hacker:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-grow"
          disabled={stage === 'boot' || loading}
        />
      </div>
      {tabCompletions.length > 0 && (
        <div className="mt-2 text-yellow-500">Completions: {tabCompletions.join(', ')}</div>
      )}
      {hint && (
        <div className="mt-2 text-yellow-500 animate-pulse">
          <Ghost className="inline mr-2" />
          {hint}
        </div>
      )}
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <Cpu className={`${stage === 'boot' ? 'text-yellow-500' : 'text-green-500'}`} />
        <Zap className={`${hackProgress >= 100 ? 'text-yellow-500' : 'text-green-500'}`} />
      </div>
      {activeMinigame === 'decrypt' && (
        <DecryptionMinigame onComplete={() => setActiveMinigame(null)} />
      )}
      {activeMinigame === 'nmap' && <NmapMinigame onComplete={() => setActiveMinigame(null)} />}
    </>
  );
};

export default Terminal;
