import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownContainer = ({ content }) => {
    return (
        <Container maxWidth="md">
            <Box mt={4} mb={4}>
                <ReactMarkdown
                    components={{
                        h1: ({ node, ...props }) => <Typography variant="h3" gutterBottom {...props} />,
                        h2: ({ node, ...props }) => <Typography variant="h4" gutterBottom {...props} />,
                        h3: ({ node, ...props }) => <Typography variant="h5" gutterBottom {...props} />,
                        p: ({ node, ...props }) => <Typography variant="body1" gutterBottom {...props} />,
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={materialDark}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <Typography
                                    component="span"
                                    sx={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                        padding: '2px 4px',
                                        borderRadius: '4px',
                                        fontFamily: 'Monaco, monospace',
                                        fontSize: '0.875em'
                                    }}
                                    {...props}
                                >
                                    {children}
                                </Typography>
                            );
                        }
                    }}
                >
                    {content}
                </ReactMarkdown>
            </Box>
        </Container>
    );
};

export default MarkdownContainer;
