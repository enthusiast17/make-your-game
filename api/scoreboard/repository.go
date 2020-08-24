package scoreboard

import (
	model "../model"
)

type Repository interface {
	Get(*model.Player) error
	Post(*model.Player) error
}
