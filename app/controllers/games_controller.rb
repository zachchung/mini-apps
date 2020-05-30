require 'open-uri'
require 'json'

class GamesController < ApplicationController
  def new
    # Pass @letters to view as instance variable
    @letters = (1..10).map { ('A'..'Z').to_a.sample }
    # @letters = %w[L O V E Y O U R S E L F] # for testing purpose
  end

  def score
    # Pass from view-new (params) to contoller
    @word = params[:word].upcase
    @letters = params[:letters]
    # raise

    # Pass to view-score (instance variables)
    @msg = hash_result(@word, @letters)[:msg]
    # Store at session (~cookies/ cache) instead of DB:
    session[:score].nil? ? session[:score] = 0 : @total_score = session[:score] += hash_result(@word, @letters)[:score]
  end

  private

  def result(word, letters)
    if included?(word, letters) # ["D", "M", "W", "Q", "W", "E", "Q", "W", "G"]
      if english_word?(word)
        # Method 1: if/else at controller:
        [word.size, "Congrats! #{word} is a valid English word!"] # score = 4 for a 4-letter-word
      else
        [0, "Sorry but #{word} does not seem to be a valid English word"]
      end
    else
      # Method 2: if/else at view (<strong>)
      [0, 'not in grid']
    end
  end

  # *** Much easier to save results as array and transform to hash via a new method
  def hash_result(word, letters)
    hash_result = {}
    arr_result = result(word, letters)
    hash_result[:score] = arr_result[0]
    hash_result[:msg] = arr_result[1]

    hash_result
  end

  def included?(guess, grid)
    guess.chars.all? { |letter| guess.count(letter) <= grid.count(letter) }
    # "word".chars => ["w", "o", "r", "d"]
    # .all? => returns true if the block never returns false or nil
    # EG. %w[ant bear cat].all? { |word| word.length >= 4 } #=> false
  end

  def english_word?(word)
    response = open("https://wagon-dictionary.herokuapp.com/#{word}")
    json = JSON.parse(response.read)
    json['found']
  end
end
