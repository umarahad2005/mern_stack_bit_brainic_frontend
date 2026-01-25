import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import CodeBlock from '../ui/CodeBlock';

const Message = ({ message, isUser }) => {
    const [copied, setCopied] = useState(false);

    // Copy message content to clipboard
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Parse message content for code blocks
    const parseContent = (content) => {
        const parts = [];
        const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(content)) !== null) {
            // Add text before code block
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: content.slice(lastIndex, match.index)
                });
            }

            // Add code block
            parts.push({
                type: 'code',
                language: match[1] || 'plaintext',
                content: match[2].trim()
            });

            lastIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (lastIndex < content.length) {
            parts.push({
                type: 'text',
                content: content.slice(lastIndex)
            });
        }

        return parts.length > 0 ? parts : [{ type: 'text', content }];
    };

    // Format text with proper markdown parsing
    const formatText = (text) => {
        return text
            // Headers
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-3">$1</h1>')
            // Bold and italic
            .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            // Inline code
            .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-tertiary text-sm font-mono text-[var(--accent)]">$1</code>')
            // Bullet points
            .replace(/^[\s]*[-•]\s+(.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
            // Numbered lists
            .replace(/^[\s]*(\d+)\.\s+(.*$)/gim, '<li class="ml-4 mb-1"><span class="font-medium">$1.</span> $2</li>')
            // Line breaks (preserve paragraph structure)
            .replace(/\n\n/g, '</p><p class="mb-3">')
            .replace(/\n/g, '<br/>');
    };

    const renderContent = () => {
        const parts = parseContent(message.content);

        return parts.map((part, index) => {
            if (part.type === 'code') {
                return (
                    <CodeBlock
                        key={index}
                        code={part.content}
                        language={part.language}
                    />
                );
            }

            // Render text with improved formatting
            return (
                <div
                    key={index}
                    className="prose-content leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: `<p class="mb-3">${formatText(part.content)}</p>`
                    }}
                />
            );
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`flex gap-2 sm:gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
        >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${isUser ? 'accent-bg text-white' : 'bg-tertiary'
                }`}>
                {isUser ? (
                    <span className="text-xs sm:text-sm font-semibold">U</span>
                ) : (
                    <img src="/log.jpeg" alt="Bot" className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
            </div>

            {/* Message bubble */}
            <div className={`group relative max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 ${isUser
                ? 'accent-bg text-white rounded-tr-none'
                : 'bg-secondary border border-theme rounded-tl-none'
                }`}>
                {/* Copy button for bot messages */}
                {!isUser && (
                    <button
                        onClick={handleCopy}
                        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-tertiary border border-theme hover:bg-secondary shadow-sm"
                        title="Copy message"
                    >
                        {copied ? (
                            <Check className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                            <Copy className="w-3.5 h-3.5 text-muted" />
                        )}
                    </button>
                )}

                {/* Message content */}
                <div className={`text-sm sm:text-base ${!isUser ? 'bot-message-content' : ''}`}>
                    {renderContent()}
                </div>

                {/* Timestamp */}
                <div className={`text-[10px] sm:text-xs mt-2 ${isUser ? 'text-white/70' : 'text-muted'}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </motion.div>
    );
};

export default Message;
