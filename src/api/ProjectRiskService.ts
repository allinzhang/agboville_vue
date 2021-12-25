import BaseService from './BaseService';
import { ProjectRisk } from "../types/ProjectRisk";


export class ProjectRiskService extends BaseService<ProjectRisk> {
  constructor() {
    super("/web/prorisk");
  }
}
