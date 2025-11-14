import React, { useState, useCallback } from 'react';
import Modal from './Modal';

type ModalType = 'About' | 'Contact' | 'Guide' | 'Privacy' | 'Terms' | 'DMCA' | null;

const MODAL_CONTENT: Record<NonNullable<ModalType>, { title: string; content: React.ReactNode }> = {
    About: { title: 'About Us', content: <p>This Recipe Unit Converter is a tool designed by HSINI MOHAMED to help cooks and bakers achieve precision and consistency in their culinary creations. We believe that accurate measurements are the foundation of any great dish.</p> },
    Contact: { title: 'Contact Us', content: <p>For inquiries, please reach out to us at <a href="mailto:hsini.web@gmail.com" className="text-blue-400 hover:underline">hsini.web@gmail.com</a> or visit our website at <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">doodax.com</a>.</p> },
    Guide: { title: 'How to Use', content: <p>Simply enter the amount you wish to convert, select the unit you are converting from, and the unit you wish to convert to. The tool will instantly provide the accurate conversion. Note: You can only convert between units of the same type (e.g., mass to mass, or volume to volume).</p> },
    Privacy: { title: 'Privacy Policy', content: <p>We respect your privacy. This application does not collect, store, or share any personal data from its users. All calculations are performed locally in your browser.</p> },
    Terms: { title: 'Terms of Service', content: <p>This tool is provided for free and "as is" without any warranty. By using this service, you agree not to hold us liable for any inaccuracies or issues that may arise from its use.</p> },
    DMCA: { title: 'DMCA Policy', content: <p>All content on this website is original. If you believe any content infringes on your copyright, please contact us at <a href="mailto:hsini.web@gmail.com" className="text-blue-400 hover:underline">hsini.web@gmail.com</a> with the necessary information for a takedown request.</p> },
};

const AnimatedBackground: React.FC = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
        <style>
        {`
            @keyframes move-stars {
                from { transform: translateY(0px); }
                to { transform: translateY(-2000px); }
            }
            @keyframes pulse-fade {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.4; }
            }
            .stars {
                position: absolute;
                width: 1px;
                height: 1px;
                background-color: white;
                border-radius: 50%;
                box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.5);
            }
            .nebula {
                 animation: pulse-fade 12s ease-in-out infinite alternate;
            }
        `}
        </style>
        <div className="absolute inset-0 opacity-50">
            {Array.from({ length: 250 }).map((_, i) => (
                <div key={i} className="stars" style={{
                    top: `${Math.random() * 2000}px`,
                    left: `${Math.random() * 100}%`,
                    animation: `move-stars ${25 + Math.random() * 30}s linear infinite`,
                    animationDelay: `${Math.random() * -55}s`,
                    transform: `scale(${Math.random() * 1.2 + 0.5})`
                }}/>
            ))}
        </div>
        <div 
            className="nebula absolute -top-1/3 -left-1/4 w-3/4 h-3/4 bg-gradient-radial from-purple-600/50 to-transparent blur-3xl"
            style={{ animationDuration: '15s' }}
        ></div>
        <div 
            className="nebula absolute -bottom-1/3 -right-1/4 w-3/4 h-3/4 bg-gradient-radial from-sky-500/50 to-transparent blur-3xl"
            style={{ animationDuration: '18s', animationDelay: '-6s' }}
        ></div>
         <div 
            className="nebula absolute -bottom-1/2 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-pink-500/40 to-transparent blur-3xl"
            style={{ animationDuration: '20s', animationDelay: '-10s' }}
        ></div>
    </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const openModal = useCallback((modal: NonNullable<ModalType>) => setActiveModal(modal), []);
    const closeModal = useCallback(() => setActiveModal(null), []);

    return (
        <div className="relative min-h-screen text-gray-200">
            <AnimatedBackground />
            <div className="relative z-10 flex flex-col min-h-screen">
                <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-white/10 sticky top-0 bg-gray-900/50 backdrop-blur-md">
                    <nav className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                        {(Object.keys(MODAL_CONTENT) as (keyof typeof MODAL_CONTENT)[]).map(key => (
                            <button key={key} onClick={() => openModal(key)} className="hover:text-white transition-colors duration-200">
                                {MODAL_CONTENT[key].title.replace(' Us', '').replace(' Policy', '').replace(' of Service', '')}
                            </button>
                        ))}
                    </nav>
                </header>

                <main className="flex-grow flex items-center justify-center">
                    {children}
                </main>

                <footer className="text-center py-6 px-4 border-t border-white/10 text-gray-400 text-sm">
                    <p>
                        Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color: '#FFD700' }}>HSINI MOHAMED</a>
                    </p>
                    <p className="mt-1">
                        <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="hover:underline">doodax.com</a> | <a href="mailto:hsini.web@gmail.com" className="hover:underline">hsini.web@gmail.com</a>
                    </p>
                </footer>
            </div>
            {activeModal && (
                <Modal title={MODAL_CONTENT[activeModal].title} onClose={closeModal}>
                    {MODAL_CONTENT[activeModal].content}
                </Modal>
            )}
        </div>
    );
};

export default Layout;