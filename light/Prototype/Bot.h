#ifndef BOT_H_INCLUDED
#define BOT_H_INCLUDED
#include <Basic.h>

class Bot{
protected:
    string answer;
    vector<string> library;
public:
    Bot(vector<string> input,int size);
    ~Bot();
    void filter(const char& guess,int[] pos);
    char guess(const Player& player);
};

#endif // BOT_H_INCLUDED
