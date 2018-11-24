// Ubuntu brainfuck interpret

#include <termios.h>
#include <unistd.h>
#include <stdio.h>

unsigned char *memoryBF = 0;
char bufferString[2] = {0,0};

int getch(void)
{
    struct termios oldattr, newattr;
    int ch;
    tcgetattr( STDIN_FILENO, &oldattr );
    newattr = oldattr;
    newattr.c_lflag &= ~( ICANON | ECHO );
    tcsetattr( STDIN_FILENO, TCSANOW, &newattr );
    ch = getchar();
    tcsetattr( STDIN_FILENO, TCSANOW, &oldattr );
    return ch;
}


void eval(char *code)
{
	
	unsigned int i = 10000;
	char *offset = 0;
	unsigned char *countMemory = memoryBF;
	while(i--)
	{
		*countMemory = 0;
		countMemory++;
	}
	countMemory = memoryBF + 5000;
	while(*code)
	{
		switch(*code)
		{
			case '+':
				*countMemory = *countMemory + 1;
			break;
			case '-':
				*countMemory = *countMemory - 1;
			break;
			case '[':
				offset = code;
			break;
			case ']':
				if(*countMemory) code = offset;
			break;
			case '>':
				countMemory++;
			break;
			case '<':
				countMemory--;
			break;
			case ',':
				*countMemory = getch();
			break;
			case '.':
				*bufferString = *countMemory;
				printf(bufferString);
			break;
			case 0:
				return;
			break;
		}
		++code;
	}
}

int main (void)
{
  int max = 1000;
	char *code = malloc(1000);
	memoryBF = malloc(10000);
	printf("BrainF*ck interpreter v1.05");
	while(max--)
	{
		printf("\r\n\r\nEnter code: ");
		scanf("%999s", code);
		printf("Output:");
		eval(code);	
		
	}
  return 0;
}
