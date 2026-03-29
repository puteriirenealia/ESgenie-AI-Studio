import React, { useEffect, useRef } from 'react';
import { AgentLog } from '@/src/types';
import { Terminal, Cpu, Eye, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface AgentConsoleProps {
  logs: AgentLog[];
  status: 'IDLE' | 'BUSY' | 'ERROR';
}

export const AgentConsole: React.FC<AgentConsoleProps> = ({ logs, status }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getIcon = (type: AgentLog['type']) => {
    switch (type) {
      case 'PLAN': return <Terminal className="w-3 h-3" />;
      case 'TOOL': return <Cpu className="w-3 h-3" />;
      case 'VISION': return <Eye className="w-3 h-3" />;
      case 'REFLECTION': return <Zap className="w-3 h-3" />;
      case 'RESULT': return <CheckCircle className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getColor = (type: AgentLog['type']) => {
    switch (type) {
      case 'PLAN': return 'text-blue-400';
      case 'TOOL': return 'text-yellow-400';
      case 'VISION': return 'text-pink-400';
      case 'REFLECTION': return 'text-purple-400';
      case 'RESULT': return 'text-terminal-green';
      default: return 'text-red-400';
    }
  };

  return (
    <div className="terminal-card h-full flex flex-col border-glow">
      <div className="p-4 border-b border-terminal-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest ml-2">Agent Console</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'BUSY' ? 'bg-terminal-green animate-pulse' : 'bg-gray-600'}`} />
          <span className="text-[10px] font-bold text-gray-500">{status}</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[11px]">
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3"
            >
              <div className={cn("mt-1 p-1 rounded bg-black border border-white/5", getColor(log.type))}>
                {getIcon(log.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className={cn("font-bold uppercase text-[9px]", getColor(log.type))}>
                    {log.type === 'PLAN' ? 'Agent Plan' : 
                     log.type === 'TOOL' ? 'Tool Execution' : 
                     log.type === 'VISION' ? 'Gemini Vision' : 
                     log.type === 'REFLECTION' ? 'Reflection' : 
                     log.type === 'RESULT' ? 'Extraction Result' : 'System'}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">{log.message}</p>
                {log.detail && (
                  <pre className="mt-2 p-2 bg-black/50 rounded border border-white/5 text-[10px] text-terminal-green overflow-x-auto">
                    {log.detail}
                  </pre>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {status === 'BUSY' && (
          <div className="flex gap-2 items-center text-terminal-green animate-pulse">
            <span className="w-1 h-3 bg-terminal-green animate-caret" />
            <span>Agent is thinking...</span>
          </div>
        )}
      </div>
    </div>
  );
};
