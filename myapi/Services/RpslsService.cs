using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Features;


namespace myapi.Services
{
    public class RpslsService
    {
        private readonly Random _random = new Random();
        public string GetResponse(string userInput)
        {
            string[] choices = ["rock", "paper", "scissors", "lizard", "spock"];
            string CPU = "";
            string result = "";

            userInput = userInput.ToLower();

            if (!choices.Contains(userInput))
            {
                return "Enter only 'rock', 'paper', 'scissors', 'lizard', or 'spock' ";
            }

            CPU = choices[_random.Next(choices.Length)];

            if(userInput == CPU)
            {
                result = "It's a tie!";
            }
            else if(
                (userInput.ToLower() == "rock" && (CPU == "scissors" || CPU == "lizard")) || 
                (userInput.ToLower() == "paper" && (CPU == "rock" || CPU == "spock")) ||
                (userInput.ToLower() == "scissors" && (CPU == "paper" || CPU == "lizard")) ||
                (userInput.ToLower() == "lizard" && (CPU == "paper" || CPU == "spock")) ||
                (userInput.ToLower() == "spock" && (CPU == "rock" || CPU == "scissors")))
                {
                    result = "You Won!";
                }

                else
                {
                    result = "You Lost!";
                }

                return $"You entered {userInput}. The computer chose {CPU}, {result}";

        }
    }
}