import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { SidebarMenuItem } from '../../components/sidebarMenuItem/sidebarMenuItem';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, SidebarMenuItem],
  templateUrl: './dashboardLayout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayout {
  public routes = routes[0].children?.filter((route) => route.data);
}
