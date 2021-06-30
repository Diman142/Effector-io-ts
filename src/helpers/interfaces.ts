
export interface PizzaItemProps {
    name: string
    flavour: string
    crust: string
    size: string
    id: number
}

export interface PizzaListProps {
    [key: string]: PizzaItemProps 
}

