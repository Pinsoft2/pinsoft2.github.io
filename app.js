import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const AdventCalendar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openedBoxes, setOpenedBoxes] = useState({});
  const [showLoginPrompt, setShowLoginPrompt] = useState(true);

  // Sample content for boxes
  const boxContents = {
    1: { image: "/api/placeholder/150/150", text: "A cute plushie! 🧸" },
    2: { image: "/api/placeholder/150/150", text: "Chocolate cookies 🍪" },
    3: { image: "/api/placeholder/150/150", text: "Warm mittens 🧤" },
    4: { image: "/api/placeholder/150/150", text: "Hot cocoa mix ☕" },
    5: { image: "/api/placeholder/150/150", text: "Candy cane 🍬" },
    6: { image: "/api/placeholder/150/150", text: "Holiday socks 🧦" },
    7: { image: "/api/placeholder/150/150", text: "Mini snowglobe ❄️" },
    8: { image: "/api/placeholder/150/150", text: "Scented candle 🕯️" },
    9: { image: "/api/placeholder/150/150", text: "Festive stickers 🌟" },
    10: { image: "/api/placeholder/150/150", text: "Cozy scarf 🧣" },
    11: { image: "/api/placeholder/150/150", text: "Gift card 🎁" },
    12: { image: "/api/placeholder/150/150", text: "Holiday mug ☕" },
    13: { image: "/api/placeholder/150/150", text: "Mini puzzle 🧩" },
    14: { image: "/api/placeholder/150/150", text: "Chocolate bar 🍫" },
    15: { image: "/api/placeholder/150/150", text: "Cute keychain 🔑" },
    16: { image: "/api/placeholder/150/150", text: "Holiday pins 📌" },
    17: { image: "/api/placeholder/150/150", text: "Mini journal 📔" },
    18: { image: "/api/placeholder/150/150", text: "Fairy lights ✨" },
    19: { image: "/api/placeholder/150/150", text: "Tea sampler 🫖" },
    20: { image: "/api/placeholder/150/150", text: "Cookie cutters 🍪" },
    21: { image: "/api/placeholder/150/150", text: "Mini plant 🌱" },
    22: { image: "/api/placeholder/150/150", text: "Washi tape 🎨" },
    23: { image: "/api/placeholder/150/150", text: "Bath bomb 🛁" },
    24: { image: "/api/placeholder/150/150", text: "Holiday cards 💌" },
    25: { image: "/api/placeholder/150/150", text: "Special surprise 🎉" },
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'ILOVESPY') {
      setIsAuthenticated(true);
      setShowLoginPrompt(false);
      setError('');
    } else {
      setError('🤨');
      setPassword('');
    }
  };

  const handleBoxClick = (boxId) => {
    setOpenedBoxes(prev => ({ ...prev, [boxId]: true }));
  };

  // Calendar Background (always visible)
  const calendarBackground = (
    <div className="min-h-screen bg-emerald-900 p-8">
      <Card className="max-w-4xl mx-auto p-8 bg-emerald-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-emerald-600 text-4xl">🍃</div>
        <div className="absolute top-0 left-0 text-emerald-600 text-4xl">🍃</div>
        
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-yellow-400 text-center mb-8"
        >
          MEOWMEOW UWU
        </motion.h1>
        
        <div className="grid grid-cols-5 gap-4 relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-yellow-400 text-4xl"
            >
              ★
            </motion.div>
          </div>
          
          {Array.from({ length: 25 }, (_, i) => {
            const boxNumber = i + 1;
            const isOpen = openedBoxes[boxNumber];
            const content = boxContents[boxNumber];

            return (
              <motion.div
                key={boxNumber}
                className="aspect-square relative perspective-1000"
                onClick={() => isAuthenticated && !isOpen && handleBoxClick(boxNumber)}
              >
                <AnimatePresence>
                  {!isOpen ? (
                    <motion.div
                      initial={false}
                      className={`
                        absolute 
                        inset-0 
                        bg-emerald-600 
                        text-emerald-100
                        rounded-lg
                        flex 
                        items-center 
                        justify-center 
                        text-xl 
                        font-bold 
                        cursor-pointer 
                        ${!isAuthenticated && 'opacity-50 cursor-not-allowed'}
                      `}
                      whileHover={isAuthenticated ? { scale: 1.1 } : {}}
                      whileTap={isAuthenticated ? { scale: 0.95 } : {}}
                    >
                      {boxNumber}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      className="
                        absolute 
                        inset-0 
                        bg-emerald-500 
                        rounded-lg 
                        p-2 
                        flex 
                        flex-col 
                        items-center 
                        justify-center 
                        text-white
                        shadow-lg
                        overflow-hidden
                      "
                    >
                      <img 
                        src={content.image} 
                        alt={content.text}
                        className="w-full h-1/2 object-cover rounded-md mb-2"
                      />
                      <p className="text-xs text-center font-medium">
                        {content.text}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-8 flex justify-center"
        >
          <div className="text-yellow-400 text-2xl">⭐ for my bb only ❤️ ⭐</div>
        </motion.div>
      </Card>
    </div>
  );

  // Login Dialog
  const loginDialog = (
    <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">🎄 Enter Password 🎄</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <img 
                    src="https://media.tenor.com/iEHRqpFwqvUAAAAd/awkward-the-rock.gif" 
                    alt="Suspicious Rock" 
                    className="w-64 h-64 object-cover rounded-lg"
                  />
                </motion.div>
                <motion.p 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl text-center"
                >
                  {error}
                </motion.p>
              </div>
            )}
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-center"
              autoFocus
            />
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Unlock Calendar
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {calendarBackground}
      {loginDialog}
    </>
  );
};

export default AdventCalendar;
