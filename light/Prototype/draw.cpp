#include <bits/stdc++.h>
using namespace std;
const int inf=1e9+7;
const int oo=1e5+5;
#define se second
#define fi first
const int wrong_answer_allowed = 7;
const int guess_time = 15;
const int hang_index = 2;
int game_status = -1;
vector<string> library;
vector<string> base;
string initial_path = "F:/project/Testing/Testing/assets/context/content/";
int hangman[9][6] = {{0,1,1,1,1,0}
                    ,{0,2,0,0,3,0}
                    ,{0,2,0,0,4,0}
                    ,{0,2,0,6,5,7}
                    ,{0,2,0,0,5,0}
                    ,{0,2,0,0,5,0}
                    ,{0,2,0,8,0,9}
                    ,{0,2,0,0,0,0}
                    ,{1,2,1,1,0,0}};

char particle[10] = {' ','_','|','|','O','I','/','\\','/','\\'};
void loadBot(vector<string>& bot){
    ifstream file("F:/project/Testing/Testing/assets/context/content/Bot.txt");
    while(!file.eof()){
        string s;
        getline(file,s);
        bot.push_back(s);
    }
    file.close();
    return ;
}
void filterBot(vector<string>& bot,const char& ref,vector<int> pos){
    int i = 0;
    if(pos.empty()){
        while(i < bot.size()){
            if(bot[i].find(ref) != -1) bot.erase(bot.begin() + i);
            else i++;
        }
    }
    else{
        while(i < bot.size()){
            bool keep=true;
            for(int j = 0;j < pos.size(); j++)
                if(bot[i][pos[j]] != ref){
                    bot.erase(bot.begin() + i);
                    keep = false;
                    break;
                }
            if(keep) i++;
        }
    }
}
int main()
{
    while(true){
    system("CLS");
    vector<string> bot;
    string ans,gg;
    bool loaded = false;
    int diff;
    cout<<"Please choose your difficulty, between 1 and 3"<<endl;
    cin>>diff;
    if(diff < 1 || diff > 3) continue;
    cout<<"Please choose your theme: \n 1 for mental \n 2 for sport \n";
    int theme_index;
    cin>>theme_index;
    if(theme_index < 0 || theme_index > 2) continue;
    string path = initial_path;
    path.push_back(char(diff+48));
    string theme =(theme_index == 1 ? "mental":"sport");
    string content = "/" + theme + ".txt";
    path += content;
    ifstream file(path);
    loadBot(bot);
    if(file){
        while(!file.eof()){
            string inp;
            getline(file,inp);
            library.push_back(inp);
        }
        int index = rand()%library.size();

        int split_index = library[index].find(';');
        ans = library[index].substr(0,split_index);
        gg = library[index].substr(split_index+1,library[index].size()-1);
        cout<<ans<<" "<<gg<<endl;
        bot.push_back(ans);
        loaded = true;
    }
    else{
        cout<<"Read files fails, the path is "<<path<<endl;
    }

    if(loaded){
        float score = 0;
        float original = 0;
        float penalty = 1;
        int status = 0;
        string temp = "It may be ";
        int suggest = 0;
        int fail = 0;
        string binded;
        for(int i = 0 ; i < ans.length();i ++) binded.push_back('_');
        vector<char> guessed;
        for(int i = 1;i<= ans.length();i++){
            int cou = 40-10*diff;
            int tick = 0;
            bool guessed = false;
            bool guess_mode = false;
            char c_guess;
            string w_guess;
            while(true){
                system("CLS");
                tick = (tick + 1)%2;
                if(tick == 0){
                    cou--;
                }
                if(cou == -1){
                    break;
                }
                for(int i = 0;i< 9;i++){
                    for(int j=0;j<6;j++){
                        if(hangman[i][j] <= fail +2)
                        cout<<particle[hangman[i][j]]<<" ";
                        else cout<<"  ";
                    }
                    cout<<endl;
                }
                cout<<"Rendered!!"<<endl;
                cout<<"You have "<<cou<<" seconds left!";
                this_thread::sleep_for( chrono::milliseconds(500) );

            }
        }

    }
    file.close();
    this_thread::sleep_for( chrono::milliseconds(3000) );
    }
	return 0;
}
