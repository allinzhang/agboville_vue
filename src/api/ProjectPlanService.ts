import BaseService from './BaseService';
import { ProjectPlan } from "../types/ProjectPlan";

export class ProjectPlanService extends BaseService<ProjectPlan> {
  constructor() {
    super("/web/proplan");
  }
}
