#ifndef PLAYER_H_INCLUDED
#define PLAYER_H_INCLUDED
#include <Basic.h>
#include <Bot.h>
class Player{
protected:
    int score;
    vector<char> guessed;
    char guess;
public:
    int time_out;
    int degrading;
    friend class Bot;

};


#endif // PLAYER_H_INCLUDED
