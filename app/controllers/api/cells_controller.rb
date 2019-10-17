require 'json'

class Api::CellsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update_board
    cells = Cell.all
    Cell.update_board(cells)
  end

  def update_cell
    cell = Cell.find_by(position: params[:position])
    cell.update(cell_params)
  end

  def load
    cells = Cell.all
    json = Cell.load_game(cells)
    render json: json
  end

  def create
  end

  private

  def cell_params
    params.require(:cell).permit!
  end
end