import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const AdventCalendar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openBox, setOpenBox] = useState(null);
  const [openedBoxes, setOpenedBoxes] = useState({});
  const [showLoginPrompt, setShowLoginPrompt] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('advent-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setShowLoginPrompt(false);
    }
  }, []);

  const boxes = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    content: `Item ${i + 1}`
  }));

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'ILOVESPY') {
      setIsAuthenticated(true);
      localStorage.setItem('advent-auth', 'true');
      setShowLoginPrompt(false);
      setError('');
    } else {
      setError('🤨');
      setPassword('');
    }
  };

  const handleBoxClick = (boxId) => {
    setOpenBox(boxId);
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
          
          {boxes.map(box => (
            <motion.div
              key={box.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: box.id * 0.05 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isAuthenticated && handleBoxClick(box.id)}
              className={`
                aspect-square 
                flex 
                items-center 
                justify-center 
                text-xl 
                font-bold 
                cursor-pointer 
                ${openedBoxes[box.id] 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-emerald-600 text-emerald-100'}
                rounded-lg
                shadow-lg
                ${!isAuthenticated && 'opacity-50 cursor-not-allowed'}
              `}
            >
              {box.id}
            </motion.div>
          ))}
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
                <img 
                  src="https://media.tenor.com/iEHRqpFwqvUAAAAd/awkward-the-rock.gif" 
                  alt="Suspicious Rock" 
                  className="w-64 h-64 object-cover rounded-lg"
                />
                <p className="text-6xl text-center">{error}</p>
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

  // Box Content Dialog
  const boxDialog = (
    <Dialog open={openBox !== null} onOpenChange={() => setOpenBox(null)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Day {openBox}</DialogTitle>
        </DialogHeader>
        <AnimatePresence>
          {openBox && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="p-6"
            >
              <div className="text-center">
                <p className="text-lg">Congratulations! You've unlocked:</p>
                <p className="text-2xl font-bold mt-4">{boxes[openBox - 1]?.content}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {calendarBackground}
      {loginDialog}
      {boxDialog}
    </>
  );
};

export default AdventCalendar;
