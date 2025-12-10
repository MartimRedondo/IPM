import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import NotFound from './views/NotFound.vue';
import ServicosCurso from './views/ServicosCurso.vue';
import ListaVeiculos from './views/ListaVeiculos.vue';
import ServicosAtribuidos from './views/ServicosAtribuidos.vue';
import HistoricoServicos from './views/HistoricoServicos.vue';
import PaginaInicial from './views/PaginaInicial.vue';
import AdicionarServico from './views/ServicosSuspensos.vue';
import DetalhesVeiculoview from './views/DetalhesVeiculoview.vue';
import DetalhesServicoview from './views/DetalhesServicoview.vue';
import EditNotasview from './views/EditNotasview.vue';

  const router = createRouter({
    history: createWebHistory(),
    routes : [
      { path: '/', redirect: '/login'},
      { path: '/login', component: LoginView},
      { path: '/PaginaInicial', component: PaginaInicial}, 
      { path: '/ServicosSuspensos', component: AdicionarServico}, 
      { path: '/HistoricoServicos', component: HistoricoServicos},
      { path: '/ListaVeiculos', component: ListaVeiculos},
      { path: '/ServicosAtribuidos', component: ServicosAtribuidos},
      { path: '/ServicosCurso', component: ServicosCurso},
      { path: '/detalhesv/:idv', component: DetalhesVeiculoview},
      { path: '/detalhess/:ids/:idv', component: DetalhesServicoview},
      { path: '/notas/:ids/:idv/:action?', component: EditNotasview, name: 'EditNotas' },
      { path: '/:notFound(.*)', component: NotFound}
    ],
  });

export default router; 

