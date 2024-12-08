//Register 
export interface IUser {
    name: string;
    email: string;
    curp: string;
    password: string;
    rol: string;
}

// Create event
export interface IMetric {
    description: string;
    max_points: number;
    id: string; // Agrego esto para darle un id a cada metrica
  }
  
export interface IEvent {
    name: string;
    max_round: number;
    metrics: IMetric[];
}

// Grades 
export interface IGrade {
    id_metric: string;
    grade: number;
    id_judge: string;
}

export interface IGrades {
    id_group: string;
    id_event: string;
    round: number;
    grades: IGrade[];
}

// Teams
export interface ITeam {
    name: string;
    id_members: string[];
    leader: string;
    round: number;
    grades: IGrades
}




